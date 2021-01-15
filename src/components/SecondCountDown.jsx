import React, {useEffect, useState} from "react";

export default function SecondCountDown(props) {
  const [second, setSecond] = useState(props.second ? props.second : 0);

  useEffect(() => {
    let curSecond = second;
    const myInterval = setInterval(() => {
      curSecond--;
      setSecond(curSecond);
      if (curSecond <= 0) {
        setSecond(0);
        clearInterval(myInterval);
      }
    }, 1000)

    return ( () => {
      clearInterval(myInterval);
    })
  }, [])

  return (
    <div style={props.style}>
      00:{second >= 10 ? second : '0' + second}
    </div>
  )
}