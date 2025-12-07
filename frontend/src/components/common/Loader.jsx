import './Loader.css';

export default function Loader({ size = 'md', text, fullScreen = false }) {
  const sizeClasses = {
    sm: 'loader-sm',
    md: 'loader-md',
    lg: 'loader-lg',
  };

  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        <div className="loader-container">
          <div className={`loader ${sizeClasses[size]}`}>
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
          </div>
          {text && <p className="loader-text">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="loader-inline">
      <div className={`loader ${sizeClasses[size]}`}>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
}
