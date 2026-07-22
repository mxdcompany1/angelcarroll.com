// Netlify serverless function: receives a form submission and creates a task
// in the correct ClickUp list. The ClickUp token stays server-side (env var),
// so it is never exposed in the browser.

const LISTS = {
  "strategy-discovery": process.env.CLICKUP_LIST_STRATEGY || "1000410000001074",
  // Both forms file into the same list (Pipeline & Proposals, in The Nexus).
  // Tasks stay distinguishable by name prefix and the per-form tag below.
  "event-booking":      process.env.CLICKUP_LIST_BOOKING  || "1000410000001074"
};

// People to notify on every submission (ClickUp notifies each assignee).
const NOTIFY = (process.env.CLICKUP_NOTIFY || "38169568")
  .split(",").map(s => parseInt(s.trim(), 10)).filter(Boolean);

const LABELS = {
  name:"Name", email:"Email", phone:"Phone", organization:"Organization",
  how_showing_up:"How they're showing up", project_needs:"Project needs",
  how_found:"How they found Angel", company:"Company / Brand", title:"Position / Title",
  address:"Business address", event_name:"Event name", event_website:"Event website",
  event_location:"Event location", collab_type:"Appearance / Collaboration type",
  event_date:"Event date", start_time:"Start time", end_time:"End time",
  budget:"Talent budget", other_talent:"Other confirmed / unconfirmed talent",
  logistics:"Additional logistics", affirmation:"Corporate Responsibility Affirmation",
  interest:"Interested in", portal_source:"Source"
};

function resp(status, obj){
  return { statusCode: status, headers:{ "Content-Type":"application/json" }, body: JSON.stringify(obj) };
}

function buildTask(form, f){
  const skip = { "bot-field":1, "form-name":1 };
  const lines = Object.keys(f)
    .filter(k => !skip[k] && f[k] !== "" && f[k] != null)
    .map(k => `**${LABELS[k] || k}:** ${f[k]}`);
  const description = lines.join("\n\n");
  let name;
  if(form === "strategy-discovery"){
    name = `Strategy inquiry — ${f.name || "New"}${f.organization ? " (" + f.organization + ")" : ""}`;
  } else {
    name = `Booking — ${f.event_name || f.name || "New"}${f.company ? " (" + f.company + ")" : ""}`;
  }
  return { name, description };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return resp(405, { error:"Method not allowed" });
  const token = process.env.CLICKUP_TOKEN;
  if (!token) return resp(500, { error:"Server not configured (missing CLICKUP_TOKEN)" });

  let payload;
  try { payload = JSON.parse(event.body || "{}"); }
  catch { return resp(400, { error:"Invalid JSON" }); }

  const listId = LISTS[payload.form];
  if (!listId) return resp(400, { error:"Unknown form" });

  const f = payload.fields || {};
  if (f["bot-field"]) return resp(200, { ok:true }); // honeypot

  const { name, description } = buildTask(payload.form, f);

  let task;
  try {
    const r = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
      method:"POST",
      headers:{ "Authorization": token, "Content-Type":"application/json" },
      body: JSON.stringify({ name, description, tags:[payload.form], assignees: NOTIFY })
    });
    if(!r.ok){ const t = await r.text(); return resp(502, { error:"ClickUp task create failed", detail:t.slice(0,300) }); }
    task = await r.json();
  } catch(e){ return resp(502, { error:"ClickUp request error", detail:String(e).slice(0,200) }); }

  if (payload.file && payload.file.dataBase64){
    try {
      const bytes = Buffer.from(payload.file.dataBase64, "base64");
      const fd = new FormData();
      fd.append("attachment", new Blob([bytes], { type: payload.file.type || "application/octet-stream" }), payload.file.name || "upload");
      await fetch(`https://api.clickup.com/api/v2/task/${task.id}/attachment`, {
        method:"POST", headers:{ "Authorization": token }, body: fd
      });
    } catch(e){ /* non-fatal */ }
  }

  return resp(200, { ok:true, taskId: task.id, url: task.url });
};
