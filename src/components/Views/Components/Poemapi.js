import React, { useState } from 'react';

import './Poemapi.css';

function Poem() {
  const [allPoems, setAllPoem] = useState('');
  const [poem, setPoem] = useState([]);
  const [currentPoem, setCurrentPoem] = useState(0);

  const getPoem = () => {
    if (!allPoems) {
      fetch('https://poetrydb.org/author,title/Shakespeare;Sonnet')
        .then((response) => response.json())
        .then((data) => {
          console.log('Poems', data);
          setAllPoem(data);
          const temp = [...poem];
          temp.push(data[0]);

          setPoem(temp);
          setCurrentPoem(1);
        });
    } else {
      const temp = [...poem];
      temp.push(allPoems[currentPoem]);

      setPoem(temp);
      setCurrentPoem(currentPoem + 1);
    }
  };
  return (
    <div className="potd">
      <span className="potd-span">Poems of the day</span>
      <button className="poem-btn" onClick={getPoem}>
        Click Here
      </button>
      {poem
        ? poem.map((single, i) => {
            return (
              <div key={i}>
                <h6>{single.title}</h6>
                <h6>{single.author}</h6>
                {single.lines.map((line, j) => {
                  return <h6 key={j}>{line}</h6>;
                })}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Poem;
