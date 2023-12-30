const ViewVideo = ({ params }: { params: { videoId: string } }) => {
  //Retrieve Video from database

  return (
    <div>
      <h1>View Video {params.videoId}</h1>
    </div>
  );
};

export default ViewVideo;
