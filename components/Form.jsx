import Link from 'next/link';


const Form = ( { type, post, setPost, submitting, handleSubmit } ) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>
        {type} Post
        </span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share your prompts with the world. 
      </p>
      <form 
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>
          <textarea
            required
            rows={5}
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            className='form_textarea mt-5 w-full resize-none '
            placeholder='Your AI Prompt'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tags {` `}
            <span className='text-xs text-gray-500'>
              (#webdevelopement #design #photography #ai #coding)
            </span>
          </span>
          <textarea
            required
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            className='form_input mt-5 w-full resize-none '
            placeholder='Tags here...'
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button type='submit' disabled={submitting} className='text-white bg-blue-gradient rounded-[10px] font-satoshi font-semibold text-sm w-[200px] py-2'>
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>    
  )
}

export default Form