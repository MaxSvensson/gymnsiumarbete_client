import type { LoaderArgs } from "@remix-run/node";
import Graph from "~/components/Graph";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
    const url = new URL(request.url);

    const data = url.searchParams.get("data")?.split(",");
    console.log(data);

    return data;
}

export default function Main() {
    const data = useLoaderData();
    return (
        <div className="w-4/6">
            <Graph data={data} />
        </div>
    );
}
