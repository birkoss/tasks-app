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

export function Register(email: string, password: string) {
    let request = createRequest("register", "POST", { email, password });

    return fetch(request)
        .then((response) => response.json())
        .then((data: any) => {
            if (data["token"] && data["token"] !== "") {
                return {
                    token: data["token"],
                };
            }

            /* Errors from the API */
            if (data["message"]) {
                for (let field in data["message"]) {
                    throw new ApiError(data["message"][field].join(" "));
                }
            }

            /* Generic error */
            throw new ApiError("An error occurred please try again later.");
        })
        .catch((error) => {
            if (error.name !== "ApiError") {
                throw new Error("An error occurred please try again later.");
            }

            throw error;
        });
}

export function Login(email: string, password: string) {
    let request = createRequest("login", "POST", { email, password });

    return fetch(request)
        .then((response) => response.json())
        .then((data: any) => {
            if (data["token"] && data["token"] !== "") {
                return {
                    token: data["token"],
                };
            }

            /* Errors from the API */
            if (data["message"]) {
                throw new ApiError(data["message"]);
            }
            /* Generic error */
            throw new ApiError("An error occurred please try again later.");
        })
        .catch((error) => {
            if (error.name !== "ApiError") {
                throw new Error("An error occurred please try again later.");
            }

            throw error;
        });
}

export function GetData(token: string) {
    let request = createRequest("getData", "GET", null, token);

    return fetch(request)
        .then((response) => response.json())
        .then((data: any) => {
            if (data["rewards"] && data["rewards"] !== "") {
                return {
                    rewards: data["rewards"],
                    groups: data["groups"],
                };
            }

            /* Errors from the API */
            if (data["message"]) {
                throw new ApiError(data["message"]);
            }
            /* Generic error */
            throw new ApiError("An error occurred please try again later.");
        })
        .catch((error) => {
            if (error.name !== "ApiError") {
                throw new Error("An error occurred please try again later.");
            }

            throw error;
        });
}

export function GetTasks(token: string, group: number) {
    let request = createRequest(
        "tasks/" + group.toString(),
        "GET",
        null,
        token
    );

    return fetch(request)
        .then((response) => response.json())
        .then((data: any) => {
            if (data["tasks"] && data["tasks"] !== "") {
                return {
                    tasks: data["tasks"],
                };
            }

            /* Errors from the API */
            if (data["message"]) {
                throw new ApiError(data["message"]);
            }
            /* Generic error */
            throw new ApiError("An error occurred please try again later.");
        })
        .catch((error) => {
            if (error.name !== "ApiError") {
                throw new Error("An error occurred please try again later.");
            }

            throw error;
        });
}
