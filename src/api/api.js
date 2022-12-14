import axiosModule from "axios";
const axios = axiosModule.create({ baseURL: `http://localhost:3001` });

function sanitizeData(teamData) {
  const {
    total_derrotas: defeats,
    total_empates: draws,
    total_vitorias: victories,
    total_gols_marcados: scoredGoals,
    total_gols_sofridos: takenGoals,
    total_jogos: matches,
    total_pontos: points,
  } = teamData;

  const balance = scoredGoals - takenGoals;

  return {
    defeats,
    draws,
    victories,
    scoredGoals,
    takenGoals,
    matches,
    points,
    balance,
  };
}

export async function apiGetChampionShipData(year) {
  const { data: championShipData } = await axios.get(`/${year}`);
  const lastRound = championShipData.length - 1;

  let { partidas: matches } = championShipData[lastRound];

  matches = matches
    .flatMap((item) => {
      let {
        mandante: host,
        visitante: visitor,
        pontuacao_geral_mandante: hostData,
        pontuacao_geral_visitante: visitorData,
      } = item;

      hostData = sanitizeData(hostData);
      visitorData = sanitizeData(visitorData);

      return [
        { teamName: host, ...hostData },
        { teamName: visitor, ...visitorData },
      ];
    })
    .sort((a, b) => b.points - a.points);

  return matches;
}
