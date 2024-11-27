import React from 'react';

export default function ScrapInsta() {
  const [state, setState] = React.useState<any>("")
  React.useEffect(() => {
    setState("LOL");
  }, [])
  return (
    <>
      {state && (<div>{state}</div>)}
    </>
  );
}
