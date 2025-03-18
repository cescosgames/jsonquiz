import { atom } from "jotai";

// our players score
export const playerScore = atom(0);

// if our player guessed, deactivating our guessing options for that question
export const playerAllreadyGuessed = atom(false);