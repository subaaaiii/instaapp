import { useTest } from "../hooks/test";

const Home = () => {
    const { data, isLoading } = useTest();
    // useEffect(()=>{
    //     console.log(data)
    // },[])
    // console.log(data);
    if (isLoading) return <p>Loading...</p>;
    return (
        <div className="font-bold bg-red-500">
            <h1>{data.status}</h1>
            <p>{data.message}</p>
        </div>
    )
}
export default Home
