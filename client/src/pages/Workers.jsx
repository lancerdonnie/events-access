import React, { useContext, useEffect } from 'react';
import Search from '../components/Search';
import Collection from '../components/Collection';
import Add from '../components/Add';
import NavBar from '../components/NavBar';
import AuthContext from '../context/authContext/AuthContext';
import AppContext from '../context/AppContext/AppContext';
import { Redirect } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Workers = () => {
  const { admin, auth } = useContext(AuthContext);
  const {
    workers,
    deleteWorker,
    deleteWorkers,
    getWorkers,
    filtered,
    filter,
    loading
  } = useContext(AppContext);
  useEffect(() => {
    console.log('mount workers');
    auth && admin && getWorkers();
    // eslint-disable-next-line
  }, [auth]);

  const handleDelete = id => {
    deleteWorker(id);
  };

  const handleModal = e => {
    if (e.target.innerText === 'YES') {
      deleteWorkers();
    } else {
      return;
    }
  };

  if (admin)
    return (
      <div>
        <NavBar />
        <Search />
        <div className='row flex-s'>
          <Collection
            handleModal={handleModal}
            admin={true}
            data={!filter ? workers : filtered}
            onDelete={handleDelete}
          />

          <Add worker={true} />
        </div>
      </div>
    );
  return <Redirect to='/' />;
};
export default Workers;
