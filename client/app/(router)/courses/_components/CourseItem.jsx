import Image from 'next/image'
import React from 'react'

function CourseItem({course}) {
  return (
    <div className='border rounded-xl hover:shadow-md hover:shadow-black-300 cursor-pointer'>
      <Image src={course?.banner?.url} width={500} height={150} alt='banner' className='rounded-t-xl'/>
      <div className='flex flex-col gap-1 p-1'>
        <h2 className='font-semibold'>{course.name}</h2>
        <h2 className='text-[15px]'>{course?.free?'Free':'Paid'}</h2>
        
      </div>
    </div>
    
  )
}

export default CourseItem
