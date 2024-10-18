const InfoCard = ({ icon: Icon, title, value }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`
        p-4 rounded-lg
        ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}
      `}
    >
      <div className="flex items-center space-x-3">
        <Icon
          className={`
            h-5 w-5
            ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
          `}
        />
        <div>
          <p
            className={`
              text-sm
              ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
            `}
          >
            {title}
          </p>
          <p
            className={`
              font-medium
              ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
