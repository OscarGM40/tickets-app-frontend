

export const getUltimos = async() => {
  // const resp = await fetch("http://localhost:8080/ultimos");
  const resp = await fetch("https://ticket-sockets-backend.herokuapp.com/ultimos");
  console.log(resp)
  const data = await resp.json();
  console.log(data)
    return data.ultimos;
}