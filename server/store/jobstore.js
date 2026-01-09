let recommendedJobTitle = "Software Engineer";

export const setJobTitle = (title) => {
  recommendedJobTitle = title;
};

export const getJobTitle = () => {
  return recommendedJobTitle;
};

export const clearJobTitle = () => {
  recommendedJobTitle = null;
};
