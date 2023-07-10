import React from 'react';
import { FormRow, Alert,FormRowSelect } from '../../Components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

export const AddJob = () => {
  const {isLoading, showAlert, displayAlert, position, company, jobLocation, jobType, jobTypeOptions, status, statusOptions, isEditing ,handleChange,clearValue,createJob,editJob} = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({name,value})
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {/* {showAlert && <Alert />} */}
        <div className="form-center">
          <FormRow type="text" name="position" value={position} handleChange={handleJobInput} />
          <FormRow type="text" name="company" value={company} handleChange={handleJobInput} />
          <FormRow type="text" labelText="location" name="jobLocation" value={jobLocation} handleChange={handleJobInput} />
          <FormRowSelect name='status' value={status} handleChange={handleJobInput} list={statusOptions}/>
          <FormRowSelect name='jobType' labelText='type' value={jobType} handleChange={handleJobInput} list={jobTypeOptions}/>
          <div className="btn-container">
            <button className="btn btn-block submit-btn" type="submit" onClick={handleSubmit} disabled={isLoading}>
              Submit
            </button>
            <button className='btn btn-block clear-btn' onClick={(e)=>{
              e.preventDefault()
              clearValue()
            }}>clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
