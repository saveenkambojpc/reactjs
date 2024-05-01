import { PageTitle } from "../Utils";
import { useGetPageScopesQuery } from "../../services/api/feature";

export default function HomePage() {
    const { data } = useGetPageScopesQuery();
    if (data) {
        sessionStorage.setItem('pagesScope', JSON.stringify(data))
    }
    return (
        <div>
            <PageTitle title="Dashboard" />
        </div>
    )
}