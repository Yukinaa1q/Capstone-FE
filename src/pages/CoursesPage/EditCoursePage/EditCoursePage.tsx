import CourseForm from "../NewCoursePage/CourseForm";

const EditCoursePage = () => {
  return (
    <section className="px-8 py-4">
      <h1 className="text-center font-bold text-2xl">EDIT COURSE</h1>
      <CourseForm
        className="mx-auto md:w-3/5 ld:w-3/4 xl:w-1/2"
        initialData={{
          courseTitle: "English for beginners",
          courseCode: "ENG101",
          courseSubject: "english",
          courseLevel: "1",
          coursePrice: 125000,
          courseDescription: [
            {
              type: "p",
              children: [{ text: "This is a course for beginners" }],
            },
            {
              type: "p",
              children: [
                {
                  text: "This course will teach you from zero to hero in English",
                },
              ],
            },
          ],
          courseOutline: [
            {
              sectionTitle: "Chapter 1: Introduction",
              isEditing: false,
              subsections: [
                { subsectionTitle: "Section 1: What is English?", isEditing: false },
                { subsectionTitle: "Section 2: The English Alphabet", isEditing: false },
                { subsectionTitle: "Section 3: The letter A/a", isEditing: false },
              ],
            },
            {
              sectionTitle: "Chapter 2: Simple Present Tense",
              isEditing: false,
              subsections: [
                { subsectionTitle: "Section 1: The Grammar", isEditing: false },
                { subsectionTitle: "Section 2: Use Case", isEditing: false },
                { subsectionTitle: "Section 3: Schedule, Fact", isEditing: false },
              ],
            },
          ],
        }}
      />
    </section>
  );
};

export default EditCoursePage;
