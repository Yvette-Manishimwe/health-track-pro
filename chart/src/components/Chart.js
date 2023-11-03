import {} from 'chart.js/auto'
import { useRef, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

const formatTime = (time) => {
    const readableTime = new Date(time).toString()
    const day = readableTime.slice(0,3)
    const hoursMinutesSeconds = readableTime.slice(16, 24)
    return `${day} ${hoursMinutesSeconds}`
}

const Chart = () => {
    const canvasRef = useRef(null)
    const [data, setData] = useState([]); // State to store fetched data

    useEffect(() => {
        // Fetch data from your backend API
        fetch('http://localhost:4000/patient/getAll')
            .then((response) => response.json())
            .then((data) => {
                setData(data); 
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const options = {
        scales: {
            y: {
                ticks: {
                    color: 'black',
                    font: {
                        size: 1,
                    }
                },
                grid: {
                    color: 'black'
                }
            },
            x:{
                ticks: {
                    color: 'black',
                    font: {
                        size: 1
                    }
                }
            }
        },
    }

    const ctx = canvasRef.current?.getContext('2d')
    let redbackgroundGradient, yellowbackgroundGradient;

    if(ctx) {
        redbackgroundGradient = ctx.createLinearGradient(0, 0, 0, 700);
    
        redbackgroundGradient.addColorStop(0, 'rgba(245, 71, 73, 0.76)');
        redbackgroundGradient.addColorStop(0.5, 'rgba(245, 71, 73, 0.2)');
    
        yellowbackgroundGradient = ctx.createLinearGradient(0, 0, 0, 500);

        yellowbackgroundGradient.addColorStop(0, 'rgba(2,0,36,0.3)')
        yellowbackgroundGradient.addColorStop(0.35, 'rgba(9,9,121,0.3)')
        yellowbackgroundGradient.addColorStop(1, 'rgba(0,212,255,0.3)')
    }

    let chartdata = {
        labels: data.patient?.map(item => {
            return formatTime(item.date_time)
        }),
        datasets: [
            {
                label: 'Temperature',
                data: data.patient?.map(item => {
                    return item.body_temperature
                }),
                // fill: true,
                // backgroundColor: yellowbackgroundGradient,
                borderColor: 'blue',
                // pointRadius: 3,
                // pointBorderWidth: 1,
                tension: 0.4
            },
            {
                label: 'Heart Rate',
                data: data.patient?.map(item => {
                    return item.heart_rate
                }),
                // fill: true, 
                // backgroundColor: redbackgroundGradient,
                borderColor:'red',
                pointRadius: 3,
                pointBorderWidth: 1,
                tension: 0.3
            }
        ]
    }

    return (
        <div className='w-full'>
            <Line data={chartdata} options={options} width={900} height={500} ></Line>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

export default Chart;