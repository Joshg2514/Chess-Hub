import React, { useEffect, useState } from "react";
import "../Global.css"
import "./HomeScreen.css"
import Header from "../components/Header"
import LeaderboardWidget from "../components/LeaderboardWidget";
import ChallengesWidget from "../components/ChallengesWidget";
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
import { acceptChallenge, createChallenge, getChallengers, getChallengesToUser, getClubMembers, getGameOfTheDay, getOpponents, getUser, submitScore } from "../api";
import { UserObj } from "../models/UserObj";
import SendChallengeWidget from "../components/SendChallengeWidget";
import SubmitScoreWidget from "../components/SubmitScoreWidget";

const MAX_CHALLENGES = 5;
const MAX_LEADERBOARD_SIZE = 10;
const MAX_GAMES = 5;

const sortMembers = (members: UserObj[]): UserObj[] => {
    const sortedMembers = members?.filter((member) => member.rating !== undefined).sort((m1, m2) => m2.rating!! - m1.rating!!)
    let currRank = 1;
    for (let i = 0; i < sortedMembers?.length; i++) {
        if (i > 0 && sortedMembers[i - 1].rating!! > sortedMembers[i].rating!!) {
            currRank = i + 1;
        }
        sortedMembers[i].rank = currRank
    }
    return sortedMembers
}

export default function HomeScreen(props: UserProps) {

    const { user } = props

    const [members, setMembers] = useState<UserObj[] | undefined>(undefined)
    const [gameOfTheDay, setGameOfTheDay] = useState<string | undefined>(undefined)
    const [challengers, setChallengers] = useState<UserObj[] | undefined>(undefined)
    const [opponents, setOpponents] = useState<UserObj[] | undefined>(undefined)
    const [showChallengeDialog, setShowChallengeDialog] = useState<boolean>(false)
    const [sendChallengeResponse, setSendChallengeResponse] = useState<string | null | undefined>(null)
    const [submitScoreOpponent, setSubmitScoreOpponent] = useState<UserObj | undefined>(undefined)

    useEffect(() => {
        if (user?.id) {
            getChallengers(user.id).then(res => {
                setChallengers(res)
            }).catch(e => {
                setChallengers([])
            })
            getOpponents(user.id).then(res => {
                setOpponents(res)
            }).catch(e => {
                setOpponents([])
            })
            if (user.club) {
                getClubMembers(user.club).then(res => {
                    setMembers(sortMembers(res))
                }).catch(e => {
                    setMembers([])
                })
            }
        }
    }, [user?.id])

    useEffect(() => {
        getGameOfTheDay().then((res) => {
            setGameOfTheDay(res)
        }).catch((err) => {
            setGameOfTheDay(undefined)
        })
    }, [])

    const handleCreateChallenge = (id: string | undefined) => {
        if (user?.id && id) {
            setSendChallengeResponse(undefined)
            createChallenge(user.id, id).then(res => {
                setSendChallengeResponse(res)
                return res
            }).catch(err => {
                setSendChallengeResponse(err)
                return err
            })
        } else {
            setSendChallengeResponse("Error validating user.")
        }
    }

    const handleSubmitScore = (player1: UserObj, player2: UserObj, player1Won: boolean | undefined) => {
        if (player1 && player2) {
            submitScore(player1, player2, player1Won)
            setOpponents((prevOpponents: UserObj[] | undefined) => prevOpponents?.filter((prevOpponent) => prevOpponent.id !== player2.id))
            setSubmitScoreOpponent(undefined)
        }
    }

    const handleAcceptChallenge = (acceptedChallenger: UserObj | undefined) => {
        if (user?.id && acceptedChallenger?.id) {
            acceptChallenge(acceptedChallenger.id, user.id)
            setChallengers(challengers?.filter((challenger) => challenger.id !== acceptedChallenger.id))
            setOpponents(prevOpponents => [...(prevOpponents || []), acceptedChallenger])
        }
    }

    const handleOpenSubmitScoreDialog = (submitScoreOpponent: UserObj | undefined) => {
        setSubmitScoreOpponent(submitScoreOpponent)
    }

    return (
        <>
            {showChallengeDialog && (
                <div className="dialog" onClick={() => {
                    setShowChallengeDialog(false)
                    setSendChallengeResponse(null)
                }}>
                    <SendChallengeWidget members={members?.filter((member) => member.id !== user?.id) || []} handleCreateChallenge={handleCreateChallenge} response={sendChallengeResponse} />
                </div>
            )}
            {submitScoreOpponent && (
                <div className="dialog" onClick={() => setSubmitScoreOpponent(undefined)}>
                    <SubmitScoreWidget player1={user} player2={submitScoreOpponent} handleSubmitScore={handleSubmitScore} />
                </div>
            )}
            <div id={"main-container"}>
                <Header user={user} />
                <div style={{ display: "flex", flexDirection: "row", backgroundColor: "whitesmoke" }}>
                    <div className={"side-padding"} />
                    <div id={"columns-container"}>
                        <div className={"column"}>
                            <div className={"column-item"}>
                                <LeaderboardWidget leaderboard={members} user={user} />
                            </div>
                        </div>
                        <div style={{ width: 32, height: 16 }} />
                        <div className={"column"}>
                            <div className={"column-item"}>
                                <ChallengesWidget challengers={challengers} setShowDialog={setShowChallengeDialog} handleAcceptChallenge={handleAcceptChallenge} />
                            </div>
                            <div style={{ height: 16 }} />
                            <div className={"column-item"}>
                                <YourGamesWidget opponents={opponents} handleSubmitScore={handleOpenSubmitScoreDialog} />
                            </div>
                            <div style={{ height: 16 }} />
                            {gameOfTheDay && (
                                <div className={"column-item"} style={{ borderRadius: 8 }}>
                                    <GameOfTheDay url={gameOfTheDay} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={"side-padding"} />
                </div>
            </div>
        </>
    );
}
