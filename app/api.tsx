const url = "http://127.0.0.1:8000/api/";

export function Register(email: string, password: string) {
    let h = new Headers();
    //h.append("Authorization", "Token XXXXXX");
    h.append("Content-Type", "application/json");

    let req = new Request(url + "register", {
        headers: h,
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });

    return fetch(req).then((response) => response.json());
}
