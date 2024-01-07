"use client";

import {useState, useEffect} from 'react'

import PromtCard from './PromtCard';


const PromtCardList = ({data, handelTagClick}) => {
  return (
    <div className='promt_layout mt-16'>
      {data.map((promt, index) => (
        <PromtCard key={promt._id} promt={promt} handelTagClick={handelTagClick}/>
      ))}
    </div>
  )

}
 
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handelSearchChange = (e) => {
    e.preventDefault();


  }

  useEffect(() => {
    const fetchPromts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      
      setPosts(data);
    }
    fetchPromts();
  },[])
  // console.log(posts);
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text" 
          placeholder='Search for tag or username'
          value={searchText}
          onChange={handelSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromtCardList
        data={posts}
        handelTagClick={() => {}}
      />
    </section>
  )
}

export default Feed