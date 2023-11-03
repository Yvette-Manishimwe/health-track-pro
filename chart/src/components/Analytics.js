import { useEffect, useState } from "react";
import Chart from "../components/charts/BarChart";
// import { ChartData } from "../types";
import { useParams } from "react-router-dom";


const getAllUserData = async(id) => {
    const response = await fetch(`http://localhost:1400/patient-record/${id}`)
    const data = await response.json()
    return data
}

export default function Analytics() {
    const [userData, setUserData] = useState([])
    const { userId } = useParams()

    useEffect(() => {
        getAllUserData(Number(userId) || 0).then((response) => {
            setUserData(response.data)
        })
    }, [])

    return (
        <div className="w-full space-y-5 px-4">
            <div className="space-y-1">
                <h2 className="text-lg font-medium text-gray-700">Analytics</h2>
            </div>
            <div className="space-y-12">
                <div>
                    <h2 className="text-xl">All the data, in one place</h2>
                    <Chart data={userData} />
                </div>
            </div>
        </div>
    )
}