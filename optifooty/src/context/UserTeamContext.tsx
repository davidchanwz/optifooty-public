import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Player } from "../types";
import { useAuth } from "./AuthContext";
import { useConstraintsContext } from "./ConstraintsContext"; // Import ConstraintsContext
import supabase from "../client";

interface UserTeamContextType {
  goalkeepers: Player[];
  defenders: Player[];
  midfielders: Player[];
  forwards: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (player: Player) => void;
  resetTeam: () => void;
  saveUserTeam: (lineup: {
    goalkeepers: Player[];
    defenders: Player[];
    midfielders: Player[];
    forwards: Player[];
  }) => Promise<void>;
  fetchUserTeam: (userId: string) => Promise<void>;
}

interface UserTeamProviderProps {
  children: ReactNode;
}

const UserTeamContext = createContext<UserTeamContextType | undefined>(
  undefined
);

const MAX_GK = 2;
const MAX_DF = 5;
const MAX_MF = 5;
const MAX_FW = 3;
const MAX_PLAYERS_PER_TEAM = 3;

export const UserTeamProvider: React.FC<UserTeamProviderProps> = ({
  children,
}) => {
  const { user } = useAuth();
  const { unselectPlayer } = useConstraintsContext(); // Use ConstraintsContext
  const [goalkeepers, setGoalkeepers] = useState<Player[]>([]);
  const [defenders, setDefenders] = useState<Player[]>([]);
  const [midfielders, setMidfielders] = useState<Player[]>([]);
  const [forwards, setForwards] = useState<Player[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      fetchUserTeam(user.id);
    } else {
      setUserId(null);
      resetTeam();
    }
  }, [user]);

  const fetchUserTeam = async (userId: string) => {
    const { data, error } = await supabase
      .from("lineups")
      .select("lineup")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user team:", error);
      return;
    }

    if (data) {
      const { lineup } = data;
      setGoalkeepers(lineup.goalkeepers || []);
      setDefenders(lineup.defenders || []);
      setMidfielders(lineup.midfielders || []);
      setForwards(lineup.forwards || []);
    }
  };

  const saveUserTeam = async (lineup: {
    goalkeepers: Player[];
    defenders: Player[];
    midfielders: Player[];
    forwards: Player[];
  }) => {
    if (!userId) return;

    const { error } = await supabase
      .from("lineups")
      .upsert({ user_id: userId, lineup }, { onConflict: "user_id" });

    if (error) {
      console.error("Error saving user team:", error);
    } else {
      console.log("Saved user team for user:", userId, lineup);
    }
  };

  const countPlayersFromTeam = (teamName: string) => {
    const allPlayers = [...goalkeepers, ...defenders, ...midfielders, ...forwards];
    return allPlayers.filter(player => player.teamName === teamName).length;
  };

  const addPlayer = (player: Player) => {
    const playersFromSameTeam = countPlayersFromTeam(player.teamName);

    if (playersFromSameTeam >= MAX_PLAYERS_PER_TEAM) {
      alert(`You cannot have more than ${MAX_PLAYERS_PER_TEAM} players from the same team.`);
      return;
    }

    let updatedTeam;
    switch (player.position) {
      case "GK":
        if (goalkeepers.length < MAX_GK) {
          updatedTeam = [...goalkeepers, player];
          setGoalkeepers(updatedTeam);
          saveUserTeam({
            goalkeepers: updatedTeam,
            defenders,
            midfielders,
            forwards,
          });
        } else {
          alert("No empty positions for Goalkeepers");
        }
        break;
      case "DEF":
        if (defenders.length < MAX_DF) {
          updatedTeam = [...defenders, player];
          setDefenders(updatedTeam);
          saveUserTeam({
            goalkeepers,
            defenders: updatedTeam,
            midfielders,
            forwards,
          });
        } else {
          alert("No empty positions for Defenders");
        }
        break;
      case "MID":
        if (midfielders.length < MAX_MF) {
          updatedTeam = [...midfielders, player];
          setMidfielders(updatedTeam);
          saveUserTeam({
            goalkeepers,
            defenders,
            midfielders: updatedTeam,
            forwards,
          });
        } else {
          alert("No empty positions for Midfielders");
        }
        break;
      case "FWD":
        if (forwards.length < MAX_FW) {
          updatedTeam = [...forwards, player];
          setForwards(updatedTeam);
          saveUserTeam({
            goalkeepers,
            defenders,
            midfielders,
            forwards: updatedTeam,
          });
        } else {
          alert("No empty positions for Forwards");
        }
        break;
      default:
        break;
    }
    console.log(
      "Added player for user:",
      userId,
      "Player:",
      player,
      "Updated team:",
      {
        goalkeepers,
        defenders,
        midfielders,
        forwards,
      }
    );
  };

  const removePlayer = (player: Player) => {
    let updatedTeam;
    switch (player.position) {
      case "GK":
        updatedTeam = goalkeepers.filter((p) => p.id !== player.id);
        setGoalkeepers(updatedTeam);
        saveUserTeam({
          goalkeepers: updatedTeam,
          defenders,
          midfielders,
          forwards,
        });
        break;
      case "DEF":
        updatedTeam = defenders.filter((p) => p.id !== player.id);
        setDefenders(updatedTeam);
        saveUserTeam({
          goalkeepers,
          defenders: updatedTeam,
          midfielders,
          forwards,
        });
        break;
      case "MID":
        updatedTeam = midfielders.filter((p) => p.id !== player.id);
        setMidfielders(updatedTeam);
        saveUserTeam({
          goalkeepers,
          defenders,
          midfielders: updatedTeam,
          forwards,
        });
        break;
      case "FWD":
        updatedTeam = forwards.filter((p) => p.id !== player.id);
        setForwards(updatedTeam);
        saveUserTeam({
          goalkeepers,
          defenders,
          midfielders,
          forwards: updatedTeam,
        });
        break;
      default:
        break;
    }

    unselectPlayer(player); // Unselect player if removed from the team

    console.log(
      "Removed player for user:",
      userId,
      "Player:",
      player,
      "Updated team:",
      {
        goalkeepers,
        defenders,
        midfielders,
        forwards,
      }
    );
  };

  const resetTeam = () => {
    setGoalkeepers([]);
    setDefenders([]);
    setMidfielders([]);
    setForwards([]);
    console.log("Team reset for user:", userId);
  };

  return (
    <UserTeamContext.Provider
      value={{
        goalkeepers,
        defenders,
        midfielders,
        forwards,
        addPlayer,
        removePlayer,
        resetTeam,
        saveUserTeam,
        fetchUserTeam
      }}
    >
      {children}
    </UserTeamContext.Provider>
  );
};

export const useUserTeamContext = (): UserTeamContextType => {
  const context = useContext(UserTeamContext);
  if (context === undefined) {
    throw new Error(
      "useUserTeamContext must be used within a UserTeamProvider"
    );
  }
  return context;
};