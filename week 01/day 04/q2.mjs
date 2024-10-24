async function q2() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  console.log("Waiting for the response...");
  await new Promise((resolve) =>
    setTimeout(resolve("Data fetched successfully!"), 3000)
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}

q2();
