import NavBar from '@/components/NavBar'

const Homepage: React.FC = () => {
  return (
    <>
      <NavBar />

      <div>
        <h1>Andonis</h1>

        <div className="Hello">
          <a
            href="https://electron-react-boilerplate.js.org/"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button">
              <span role="img" aria-label="books">
                📚
              </span>
              Read our docs
            </button>
          </a>
          <a
            href="https://github.com/sponsors/electron-react-boilerplate"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button">
              <span role="img" aria-label="books">
                🙏
              </span>
              Donate
            </button>
          </a>
        </div>
      </div>
    </>
  )
}

export default Homepage
