const url = "http://localhost:8080/api/agent";

export async function fetchAll() {
    const response = await fetch(url);
    if (response.status !== 200) {
        return Promise.reject("Could not fetch all Agents!");
    }
    return await response.json();
};

export async function fetchById(id) {
    const response = await fetch(`${url}/${id}`);
    if (response.status === 404) {
        throw new Error(response.statusText);
    }
    if (response.status !== 200) {
        return Promise.reject("Could not fetch agent");
    }
    return await response.json();
}

export async function save(agent, token) {
    const init = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(agent)
    };

    if (agent.agentId > 0) {
        init.method = "PUT";
        const response = await fetch(`${url}/${agent.agentId}`, init);
        if (response.status === 400) {
            const errors = await response.json();
            return Promise.reject(errors);
        }
        if (response.status !== 204) {
            return Promise.reject("Could not update agent");
        }
    } else {
        init.method = "POST";
        const response = await fetch(url, init);
        if (response.status === 400) {
            const errors = await response.json();
            return Promise.reject(errors);
        } else if (response.status === 201) {
            return await response.json();
        }
        return Promise.reject("Agent not created.");
    }
}

export async function deleteById(id, token) {
    const init = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };
    const response = await fetch(`${url}/${id}`, init);
    if (response.status !== 204) {
        return Promise.reject(`Could not delete agent: ${id}`);
    }
}