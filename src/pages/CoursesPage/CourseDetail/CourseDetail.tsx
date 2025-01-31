import { useParams } from "react-router";

const CourseDetail = () => {
  const params = useParams();
  console.log(params);
  return (
    <>
      <section className="p-10 bg-fixed bg-center bg-linear-[black] bg-[url(https://plus.unsplash.com/premium_photo-1724266846347-bd10efdd330e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
        <h1 className="text-2xl font-semibold">Calculus 1</h1>
        <h2>MT1002 | 2024 - 2025</h2>
        <div className="grid grid-cols-[240px_auto] mt-4">
          <div>Learning Duration</div>
          <div className="font-semibold">23/8/2024 - 23/12/2024</div>
          <div>Pre-registraiton Duration</div>
          <div className="font-semibold">23/8/2024 - 23/12/2024</div>
          <div>Pre-registraiton Number</div>
          <div className="font-semibold">200</div>
        </div>
      </section>
      <section></section>
    </>
  );
};

export default CourseDetail;
