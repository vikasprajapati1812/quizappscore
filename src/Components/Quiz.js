import React, { useState, useEffect } from 'react';
import { Data } from './Data';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar' style={styles.navbar}>
      <div style={styles.logoContainer}>
        <h1 style={styles.title}>Quiz App</h1>
      </div>
      <div style={styles.linksContainer}>
        <Link to='/quiz/HTML' style={styles.link}>HTML</Link>
        <Link to='/quiz/CSS' style={styles.link}>CSS</Link>
        <Link to='/quiz/JavaScript' style={styles.link}>JavaScript</Link>
        <Link to='/quiz/Python' style={styles.link}>Python</Link>
        <Link to='/quiz/Java' style={styles.link}>Java</Link>
      </div>
    </nav>
  );
};

const Quiz = () => {
  const { language } = useParams();
  const filteredData = Data.filter((item) => item.language === language);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setIndex(0); // Reset question index when language changes
    setScore(0); // Reset score when language changes
    setSelectedOption(null); // Reset selected option when language changes
  }, [language]);

  const next = () => {
    if (index < filteredData.length - 1) {
      setIndex(index + 1);
      setSelectedOption(null);
    } else {
      document.querySelector('.score').innerHTML = `<p>Your Score: ${score}/${filteredData.length}</p>`;
      document.querySelector('.quiz').innerHTML = '';
      const nextBtn = document.querySelector('#next');
      nextBtn.innerHTML = 'Play Again';
      nextBtn.classList.add('reset');
      const reset = document.querySelector('.reset');
      reset.addEventListener('click', () => {
        window.location.reload();
      });
    }
  };

  const handleInput = (e) => {
    const chooseValue = e.target.value;
    setSelectedOption(chooseValue);
    if (chooseValue === filteredData[index].ans) {
      setScore(score + 1);
    }
  };

  return (
    <div className='container' style={styles.container}>
      <h1>Quiz - {language}</h1>
      <div className='quiz'>
        <div>
          <h1>{filteredData[index].q}</h1>
        </div>
        <div className='option'>
          <input
            name='select'
            type='radio'
            onChange={handleInput}
            className='checkValue'
            value={filteredData[index].a}
            checked={selectedOption === filteredData[index].a}
          />
          <p>A: {filteredData[index].a}</p>
        </div>
        <div className='option'>
          <input
            name='select'
            type='radio'
            onChange={handleInput}
            className='checkValue'
            value={filteredData[index].b}
            checked={selectedOption === filteredData[index].b}
          />
          <p>B: {filteredData[index].b}</p>
        </div>
        <div className='option'>
          <input
            name='select'
            type='radio'
            onChange={handleInput}
            className='checkValue'
            value={filteredData[index].c}
            checked={selectedOption === filteredData[index].c}
          />
          <p>C: {filteredData[index].c}</p>
        </div>
        <div className='option'>
          <input
            name='select'
            type='radio'
            onChange={handleInput}
            className='checkValue'
            value={filteredData[index].d}
            checked={selectedOption === filteredData[index].d}
          />
          <p>D: {filteredData[index].d}</p>
        </div>
      </div>
      <div className='score'></div>
      <div className='btns'>
        <button id='next' onClick={next}>Next</button>
      </div>
    </div>
  );
};



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/quiz/:language' element={<Quiz />} />
      </Routes>
    </Router>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    color: '#fff',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  linksContainer: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: '#F9AA33',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
  },
  container: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '20px auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
  },
};

export default App;
