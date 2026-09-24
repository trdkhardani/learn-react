export async function genericFetch(url, signal) {
  const response = await fetch(url, {signal});

  if (!response.ok)
    throw new Error('Error fetching products');

  return await response.json();
}