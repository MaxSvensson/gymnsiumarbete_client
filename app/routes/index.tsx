import type { ActionArgs } from "@remix-run/node";
import { Outlet, Form } from "@remix-run/react";
import { redirect } from "@remix-run/node"; // or cloudflare/deno

import { Input } from "~/components/Input";
import { getCordinates, getWeatherData } from "~/server/app.server";

export async function action({ request }: ActionArgs) {
    const body = await request.formData();

    const address = body.get("address") as string;

    const cords = await getCordinates(address);

    const data = await getWeatherData(cords);

    fetch("http://127.0.0.1:5000/", {
        method: "POST",
        body: new URLSearchParams({
            data: data,
        }),
    })
        .then((response) => response.json())
        .then((predictions) => {
            console.log(predictions);
        })
        .catch((error) => {
            console.error(error);
        });
    return redirect(`/result?data=${data}`);
}

export default function Main() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-400 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white">
                        Energi data
                    </h1>
                </div>
            </header>
            <main className="flex-1">
                <Outlet />
                <Form
                    reloadDocument
                    method="post"
                    className="bg-white shadow-md rounded h-96 px-8 pt-6 pb-8 mb-4 w-96 m-auto mt-40">
                    <Input name="address" placeholder="Address" />
                    <button
                        className="w-full mt-4 bg-slate-100 p-2 rounded-lg text-black"
                        type="submit">
                        Hämta data
                    </button>
                </Form>
            </main>
        </div>
    );
}
