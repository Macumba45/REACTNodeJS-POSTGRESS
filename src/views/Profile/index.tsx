import { FC, useCallback, useEffect, useState } from "react";
import Title from "../../components/CardApod/Title";
import Url from "../../components/CardApod/Url";
import Date from "../../components/CardApod/Date";
import NavBar from "../../components/NavBar";
import { getAuthenticatedToken } from "../../services/storage";
import { ApodFavContainer, ContainerProfile, Content, EmailContainer, IdContainer, MainContainerProfile } from "./styles";

const Profile: FC = () => {

    const [userData, setUserData] = useState<{ id: string, email: string, name: string } | null>(null);
    const [apodFavs, setApodFavs] = useState<any[]>([]);


    const userInfo = useCallback(async () => {

        const token = getAuthenticatedToken(); // Obtener el token de localStorage
        const response = await fetch('http://localhost:8000/users/profile', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Agregar el token al header 'Authorization'
            },
        })
        const data = await response.json();
        setUserData(data)

    }, []);

    const getApodFav = useCallback(async () => {

        const token = getAuthenticatedToken(); // Obtener el token de localStorage
        const response = await fetch('http://localhost:8000/users/favList/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();
        const apodFavs = data.apodFavorites;
        console.log(apodFavs)
        return apodFavs


    }, [])

    useEffect(() => {
        userInfo();
        getApodFav().then((apodFavs) => {
            setApodFavs(apodFavs);
        });
    }, [userInfo, getApodFav]);

    return (

        <>
            <NavBar />
            <MainContainerProfile>
                <ContainerProfile>
                    <IdContainer>ID: {userData?.id}</IdContainer>
                    <EmailContainer>Email: {userData?.email}</EmailContainer>
                    {userData?.name ? `Name: ${userData.name}` : null}
                </ContainerProfile>
                <ApodFavContainer>
                    {apodFavs.map((fav) => (
                        <Content>
                            <Title title={fav.title}
                            />
                            <Url url={fav.url}
                            />
                            <Date date={fav.date}
                            />
                        </Content>

                    ))}
                </ApodFavContainer>

            </MainContainerProfile>

        </>

    )
}


export default Profile;