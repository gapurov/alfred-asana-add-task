interface Response {
  data: {
    name: string;
    notes: string;
    permalink_url: string;
  };
}

interface Result {
  title: string;
  subtitle: string;
  arg?: string;
  text?: {
    copy: string;
    largetype: string;
  };
  mods?: {
    cmd: {
      arg: string;
      subtitle: string;
    };
  };
}

const [apiKey, workspace, assignee, ...value] = Deno.args[0].split(" ");
const [name, notes = ""] = value.join(" ").split("::");

const taskBody = {
  data: {
    assignee,
    workspace,
    name,
    notes,
  },
};

try {
  const res = await fetch(`https://app.asana.com/api/1.0/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(taskBody),
  });

  const body: Response = await res.json();

  console.log(body.data.name);
} catch (error) {
  console.log(JSON.stringify(error, null, 2));
}
