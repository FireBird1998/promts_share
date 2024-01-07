import PromtCard from './PromtCard'


const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  
  return (
    
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className='promt_layout mt-10'>
        {data.map((promt, index) => (
          <PromtCard 
            key={promt._id} 
            promt={promt} 
            handleEdit={() => handleEdit && handleDelete(promt)}
            handleDelete={() => handleDelete && handleDelete(promt)}
          />

        ))}
      </div>
    </section>
  )
}

export default Profile