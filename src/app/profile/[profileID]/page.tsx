import ResponsiveGrid from '@/components/Grid'
import React from 'react'

const IndividualProfile = ({ params }: { params: { profileID: string } }) => {
  return (
    <div>
      <ResponsiveGrid currentPage='PROFILE' userProfile={params.profileID} />
    </div>
  )
}

export default IndividualProfile