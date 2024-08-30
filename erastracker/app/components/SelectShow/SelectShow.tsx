import React from 'react'

const SelectShow = () => {
  return (
    <div className='artboard artboard-horizontal phone-6'>
      <div className="flex w-full flex-col">
      <div className="divider">Default</div>
        <select className="select select-primary w-full max-w-xs">
              <option disabled selected>Choose your show</option>
              <option></option>
              <option></option>
              <option></option>
              <option></option>
        </select>
        </div>
        
    </div>
  )
}

export default SelectShow