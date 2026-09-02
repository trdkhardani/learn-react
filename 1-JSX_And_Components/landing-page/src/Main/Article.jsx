function Article({children, id}) {

  return (
    <article id={id}>
      {children}
    </article>
  )
}

export default Article