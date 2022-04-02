import React, { useEffect, useState } from "react";
import "../Global.css"
import "./HomeScreen.css"
import Header from "../components/Header"
import LeaderboardWidget from "../components/LeaderboardWidget";
import ChallengesWidget from "../components/ChallengesWidget";
import ScheduledGamesWidget from "../components/ScheduledGamesWidget";
import GameOfTheDay from "../components/GameOfTheDay";
import {
    dummyChallengers,
    dummyLeaderboard,
    dummyLoggedInUser,
    dummyOpponents,
    dummyScheduledGames
} from "../models/DummyData"
import YourGamesWidget from "../components/YourGamesWidget";
import UserProps from "./ScreensProps";
import { createChallenge, getChallengers, getChallengesToUser, getClubMembers, getUser } from "../api";
import { UserObj } from "../models/UserObj";
import SendChallengeWidget from "../components/SendChallengeWidget";

const MAX_CHALLENGES = 5;
const MAX_LEADERBOARD_SIZE = 10;
const MAX_GAMES = 5;

export default function HomeScreen(props: UserProps) {

    const { user } = props

    const [members, setMembers] = useState<UserObj[] | undefined>(undefined)
    const [challengers, setChallengers] = useState<UserObj[] | undefined>(undefined)
    const [showChallengeDialog, setShowChallengeDialog] = useState<boolean>(false)

    useEffect(() => {
        if (user?.id) {
            getChallengers(user.id).then(res => {
                setChallengers(res)
            }).catch(e => {
                setChallengers([])
            })
            if (user.club) {
                getClubMembers(user.club).then(res => {
                    setMembers(res)
                }).catch(e => {
                    setMembers([])
                })
            }
        }
    }, [user?.id])

    const handleChallenge = (id: string | undefined) => {
        if (user?.id && id) {
            createChallenge(user.id, id).finally(() => {
                setShowChallengeDialog(false)
            })
        }
    }

    return (
        <>
            {showChallengeDialog && (
                <div className="dialog">
                    <SendChallengeWidget members={members?.filter((member) => member.id !== user?.id) || []} handleChallenge={handleChallenge} />
                </div>
            )}
            <div id={"main-container"}>
                <Header user={user} />
                <div style={{ display: "flex", flexDirection: "row", backgroundColor: "whitesmoke" }}>
                    <div className={"side-padding"} />
                    <div id={"columns-container"}>
                        <div className={"column"}>
                            <div className={"column-item"}>
                                <LeaderboardWidget leaderboard={dummyLeaderboard.slice(0, MAX_LEADERBOARD_SIZE)} user={dummyLoggedInUser} />
                            </div>
                        </div>
                        <div style={{ width: 32, height: 16 }} />
                        <div className={"column"}>
                            <div className={"column-item"}>
                                <ChallengesWidget challengers={challengers} setShowDialog={setShowChallengeDialog} />
                            </div>
                            <div style={{ height: 16 }} />
                            <div className={"column-item"}>
                                <YourGamesWidget opponents={dummyOpponents.slice(0, MAX_GAMES)} />
                            </div>
                            <div style={{ height: 16 }} />
                            <div className={"column-item"} style={{ borderRadius: "8px 8px 0px 0px" }}>
                                <GameOfTheDay url={"https://lichess.org/embed/MPJcy1JW?theme=auto&bg=auto"} />
                            </div>
                        </div>
                    </div>
                    <div className={"side-padding"} />
                </div>
            </div>
        </>
    );
}