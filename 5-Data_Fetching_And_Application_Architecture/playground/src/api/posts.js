export async function fetchPosts(search, page, signal) {
  // gausah try catch biar function ini propagate error-nya
  const response = await fetch(`https://jsonplaceholder.typicode.com/post?search=${search}&page=${page}`, { signal });

  if (!response.ok) {
    throw new Error("Error occurred when fetching posts");
  }

  const data = await response.json();
  return data;
  // try {
  // } catch (err) {
  //   console.error(err);
  // }
}
