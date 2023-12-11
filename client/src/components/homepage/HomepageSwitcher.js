import QuestionPage from "../questions/QuestionPage";
import React, { useContext } from "react";
import { PageContext } from "../PageContext";
import AskAQuestion from "../questions/AskAQuestion/AskAQuestion";
import SearchPage from "../Search/SearchPage";
import TagsPage from "../tags/tagsPage";
import ViewAnswer from "../answers/answersPage";
import PostNewAnswer from "../answers/PostNewAnswer/postNewAnswer";
import Login from "../users/login";
import Register from "../users/register";
import Profile from "../users/profile/profile";
import ModifyQuestion from "../users/profile/modifyQuestion";
import ProfileQuestionPage from "../users/profile/profileQuestionsPage";
import ProfileAnswers from "../users/profile/profileAnswersPage";
import ModifyAnswer from "../users/profile/modifyAnswer";
import ProfileTagsPage from "../users/profile/profileTagsPage";
import ModifyTag from "../users/profile/modifyTag";

const HomepageSwitcher = () => {
  const { page, questionId, answer, tag } = useContext(PageContext);
  // const { page } = useContext(PageContext);

  switch (page) {
    case 1:
      return (
        <div>
          <QuestionPage />
        </div>
      );
    case 2:
      return (
        <div>
           <TagsPage />
         </div>
       );
    case 3:
      return (
        <div>
          <AskAQuestion />
        </div>
      );
    case 4:
      return (
        <div>
          <h2>No Questions Found</h2>
        </div>
      );
    case 5:
      return (
        <div>
          <SearchPage />
        </div>
      );
    case 6:
      return (
        <div>
           <ViewAnswer questionId={questionId} />
         </div>
       );
     case 7:
       return (
         <div>
           <PostNewAnswer questionId={questionId} />
         </div>
       );
      case 8:
          return (
              <div>
                  <Login/>
              </div>
          );
      case 9:
          return (
              <div>
                  <Profile/>
              </div>
          );
      case 10:
          return (
              <div>
                  <Register/>
              </div>
          );
      case 11:
          return (
              <div>
                  <ModifyQuestion questionId={questionId}/>
              </div>
          );
      case 12:
          return (
              <div>
                  <ProfileQuestionPage/>
              </div>
          );
      case 13:
          return(
              <div>
                <ProfileAnswers/>
              </div>
          );
      case 14:
          return(
              <div>
                <ModifyAnswer answer={answer}/>
              </div>
          );
      case 15:
          return(
              <div>
                  <ProfileTagsPage/>
              </div>
          );
      case 16:
          return(
              <div>
                  <ModifyTag tag={tag}/>
              </div>
          );
  }
};

export default HomepageSwitcher;
