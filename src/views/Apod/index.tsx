import { FC, useCallback, useState } from "react";
import CardApod from "../../components/CardApod";
import NavBar from "../../components/NavBar";
import { getAuthenticatedToken } from "../../services/storage";
import { MainApodContainer, ApodButton, ApodButtonsLink, ApodContainer, BackgorundImg, SyncApiApod, SyncApiApodContainer } from "./styles";

const Apod: FC = () => {

    const [apodData, setApodData] = useState<any[]>([]); // inicializar la variable apodData como array vacío
    const [isLoading, setIsLoading] = useState(false);



    const syncApiApods = async () => {

        setIsLoading(true);


        try {

            const token = getAuthenticatedToken(); // Obtener el token de localStorage
            await fetch('http://localhost:8000/sync-api/', {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Agregar el token al header 'Authorization'
                },
            })

        } catch (error) {
            console.log(error)

        }

        setIsLoading(false);


    }

    const printApods = async () => {

        try {

            const token = getAuthenticatedToken(); // Obtener el token de localStorage
            const response = await fetch('http://localhost:8000/apods/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Agregar el token al header 'Authorization'
                },
            })
            const data = await response.json(); // obtener los datos de la respuesta
            setApodData(data); // guardar los datos en la variable apodData

        } catch (error) {

            console.log(error)

        }

    }

    const onRemove = useCallback((id: number) => {

        setApodData((prev) => prev.filter((apod) => apod.id !== id))

    }, [])


    return (

        <>
            <NavBar />

            <MainApodContainer>
                <ApodButtonsLink>
                    <ApodButton onClick={syncApiApods} >Sync Apod</ApodButton>
                    <ApodButton onClick={printApods}>Print Apod From DB</ApodButton>

                </ApodButtonsLink>
            </MainApodContainer>
            <SyncApiApodContainer>
                {isLoading && <SyncApiApod>Synchronizing...</SyncApiApod>}
            </SyncApiApodContainer>
            <ApodContainer>
                {apodData.map((apod) => {

                    return (

                        <CardApod
                            key={apod.id}
                            title={apod.title}
                            date={apod.date}
                            url={apod.url}
                            id={apod.id}
                            onRemove={onRemove} />
                    )
                })}

            </ApodContainer>

        </>

    )
}

export default Apod;
