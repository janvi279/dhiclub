import { HOTNESS_LEVELS } from "./constants";

const HotnessRating = ({ values, setFieldValue, error, touched }) => (
  <div className="space-y-3">
    <label className="block text-sm font-medium text-gray-700">
      How hot is this referral? *
    </label>
    <div className="space-y-2">
      {HOTNESS_LEVELS.map(({ level, color, width, label }) => {
        const isSelected = values.hotness === level;
        return (
          <div key={level} className="flex items-center space-x-3">
            {/* Checkbox */}
            <div
              className={`
                w-4 h-4 rounded border-2 cursor-pointer flex items-center justify-center
                ${isSelected ? "border-primary-200 bg-primary-200" : "border-gray-300 bg-white"}
              `}
              onClick={() => setFieldValue("hotness", isSelected ? 0 : level)}
            >
              {isSelected && (
                <svg className="w-2 h-2 text-white fill-current" viewBox="0 0 8 8">
                  <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z" />
                </svg>
              )}
            </div>

            {/* Bar */}
            <div
              className={`${width} h-4 rounded ${color} cursor-pointer`}
              onClick={() => setFieldValue("hotness", level)}
            />

            <span className="text-xs text-gray-500 min-w-[60px]">{label}</span>
          </div>
        );
      })}
    </div>
    {error && touched && <div className="text-sm text-red-600">{error}</div>}
  </div>
);

export default HotnessRating;
