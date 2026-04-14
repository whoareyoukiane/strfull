export default function Background() {
  return (
    <>
      <div
        className="letters"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        <img
          className="imgLetters"
          src="/images/bg.jpg"
          alt=""
          style={{
            width: '80%',
            height: '95vh',
            position: 'absolute', 

          }}
        />
      </div>
    </>
  );
}
