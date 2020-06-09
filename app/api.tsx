const url = "http://127.0.0.1:8000/api/";

class ApiError extends Error {
    constructor(...params: any[]) {
        super(...params);
        this.name = "ApiError";
    }
}

function createRequest(
    endpoint: string,
    method: string,
    body: any = null,
    token: string = ""
) {
    method = method.toUpperCase();

    let headers = new Headers();
    if (token !== "") {
        headers.append("Authorization", "Token " + token);
    }
    headers.append("Content-Type", "application/json");

    let request = new Request(url + endpoint, {
        headers,
        method,
        body: body !== null ? JSON.stringify(body) : null,
    });

    return request;
}

function fetchRequest(request: Request, response: Function) {
    return fetch(request)
        .then((response) => response.json())
        .then((data: any) => {
            // Everything is fine from the API
            if (data["status"] && data["status"] === 200) {
                return response(data);
            }

            // Errors from the API
            if (data["message"]) {
                for (let field in data["message"]) {
                    throw new ApiError(data["message"][field].join(" "));
                }
            }

            // Generic error
            throw new ApiError("An error occurred please try again later.");
        })
        .catch((error) => {
            if (error.name !== "ApiError") {
                throw new Error("An error occurred please try again later.");
            }

            throw error;
        });
}

export function Register(email: string, password: string) {
    let request = createRequest("register", "POST", { email, password });

    return fetchRequest(request, (data: any) => {
        return {
            token: data["token"],
        };
    });
}

export function Login(email: string, password: string) {
    let request = createRequest("login", "POST", { email, password });

    return fetchRequest(request, (data: any) => {
        return {
            token: data["token"],
        };
    });
}

export function GetData(token: string) {
    let request = createRequest("account", "GET", null, token);

    return fetchRequest(request, (data: any) => {
        return {
            id: data["id"],
            rewards: data["rewards"],
            groups: data["groups"],
        };
    });
}

export function GetTasks(token: string, group: number, user: number = 0) {
    let request = createRequest(
        user > 0 ? "users/" + user.toString() + "/tasks" : "tasks",
        "GET",
        null,
        token
    );

    return fetchRequest(request, (data: any) => {
        return {
            tasks: data["tasks"],
        };
    });
}

export function GetUsers(token: string, group: number) {
    let request = createRequest("users", "GET", null, token);

    return fetchRequest(request, (data: any) => {
        return {
            users: data["users"],
        };
    });
}

export function AddUser(token: string, group: number, user: any) {
    let request = createRequest(
        "groups/" + group.toString() + "/users",
        "POST",
        user,
        token
    );

    return fetchRequest(request, (data: any) => {
        return {};
    });
}

export function AddTask(token: string, group: number, task: any) {
    let request = createRequest(
        "groups/" + group.toString() + "/tasks",
        "POST",
        task,
        token
    );

    return fetchRequest(request, (data: any) => {
        return {};
    });
}

export function DeleteTask(token: string, taskID: number) {
    let request = createRequest(
        "tasks/" + taskID.toString(),
        "DELETE",
        null,
        token
    );

    return fetchRequest(request, (data: any) => {
        return {};
    });
}

export function UserSelectTask(token: string, taskID: number) {
    let request = createRequest(
        "tasks/" + taskID.toString() + "/select",
        "PUT",
        null,
        token
    );

    return fetchRequest(request, (data: any) => {
        return {};
    });
}

export function UserUnselectTask(token: string, taskID: number) {
    let request = createRequest(
        "tasks/" + taskID.toString() + "/unselect",
        "PUT",
        null,
        token
    );

    return fetchRequest(request, (data: any) => {
        return {};
    });
}

export function UserCompleteTask(token: string, taskID: number) {
    let request = createRequest(
        "tasks/" + taskID.toString() + "/complete",
        "PUT",
        null,
        token
    );

    return fetchRequest(request, (data: any) => {
        return {};
    });
}
