import React, { useState } from 'react';
import { Activity, Moon, Zap, Heart, Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const App = () => {
  const [scores, setScores] = useState({
    sleep: 1,
    stress: 1,
    fatigue: 1,
    soreness: 1
  });

  const [history, setHistory] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateHooperIndex = () => {
    return scores.sleep + scores.stress + scores.fatigue + scores.soreness;
  };

  const getReadinessLevel = () => {
    const hooperIndex = calculateHooperIndex();
    
    // Hooper Index scoring: lower = better readiness
    // Range 4-20, convert to readiness percentage
    const readinessPercentage = ((20 - hooperIndex) / 16) * 100;
    
    if (readinessPercentage >= 75) return { level: 'High', color: 'text-green-600', bg: 'bg-green-50' };
    if (readinessPercentage >= 50) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Low', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const getTrainingRecommendations = () => {
    const readiness = getReadinessLevel();
    
    if (readiness.level === 'High') {
      return {
        intensity: 'High intensity training recommended',
        volume: 'Normal to high training volume',
        focus: 'Skill work, high-intensity intervals, strength training',
        recovery: 'Maintain current recovery protocols'
      };
    } else if (readiness.level === 'Moderate') {
      return {
        intensity: 'Moderate intensity, avoid peak efforts',
        volume: 'Reduced volume (75-85% of normal)',
        focus: 'Technical skills, moderate aerobic work',
        recovery: 'Enhanced recovery protocols recommended'
      };
    } else {
      return {
        intensity: 'Low intensity only',
        volume: 'Significantly reduced volume (50-60% of normal)',
        focus: 'Active recovery, mobility, light skill work',
        recovery: 'Priority on sleep, nutrition, stress management'
      };
    }
  };

  const handleScoreChange = (metric, value) => {
    setScores(prev => ({
      ...prev,
      [metric]: parseInt(value)
    }));
  };

  const saveEntry = () => {
    const entry = {
      date: currentDate,
      hooperIndex: calculateHooperIndex(),
      scores: { ...scores },
      readiness: getReadinessLevel().level
    };
    
    setHistory(prev => {
      const updated = prev.filter(item => item.date !== currentDate);
      return [...updated, entry].sort((a, b) => new Date(b.date) - new Date(a.date));
    });
  };

  const hooperIndex = calculateHooperIndex();
  const readiness = getReadinessLevel();
  const recommendations = getTrainingRecommendations();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Training Readiness Monitor</h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">BETA</span>
          </div>
          <p className="text-gray-600">Hooper Index Assessment for Optimal Training</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Input */}
          <div className="space-y-6">
            {/* Date Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Assessment Date</h3>
              </div>
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Hooper Index Questionnaire */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Hooper Index Assessment</h3>
              <p className="text-sm text-gray-600 mb-6">Rate each factor on waking this morning (1 = very good/low, 5 = very poor/high)</p>
              
              <div className="space-y-6">
                {/* Sleep Quality */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Moon className="h-5 w-5 text-blue-600" />
                    <label className="font-medium">Sleep Quality</label>
                    <span className="text-sm text-gray-500">({scores.sleep}/5)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={scores.sleep}
                    onChange={(e) => handleScoreChange('sleep', e.target.value)}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #fbbf24 50%, #ef4444 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Very good</span>
                    <span>Very poor</span>
                  </div>
                </div>

                {/* Stress Level */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <label className="font-medium">Stress Level</label>
                    <span className="text-sm text-gray-500">({scores.stress}/5)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={scores.stress}
                    onChange={(e) => handleScoreChange('stress', e.target.value)}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #fbbf24 50%, #ef4444 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Very low</span>
                    <span>Very high</span>
                  </div>
                </div>

                {/* Fatigue Level */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    <label className="font-medium">Fatigue Level</label>
                    <span className="text-sm text-gray-500">({scores.fatigue}/5)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={scores.fatigue}
                    onChange={(e) => handleScoreChange('fatigue', e.target.value)}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #fbbf24 50%, #ef4444 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Very low</span>
                    <span>Very high</span>
                  </div>
                </div>

                {/* Muscle Soreness */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-5 w-5 text-red-600" />
                    <label className="font-medium">Muscle Soreness (DOMS)</label>
                    <span className="text-sm text-gray-500">({scores.soreness}/5)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={scores.soreness}
                    onChange={(e) => handleScoreChange('soreness', e.target.value)}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #fbbf24 50%, #ef4444 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Very low</span>
                    <span>Very high</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={saveEntry}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Save Assessment
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Saves to Recent History (resets on page refresh)
              </p>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Current Readiness */}
            <div className={`rounded-lg shadow-sm p-6 ${readiness.bg}`}>
              <div className="flex items-center gap-3 mb-4">
                {readiness.level === 'High' ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : readiness.level === 'Moderate' ? (
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                )}
                <div>
                  <h3 className="text-xl font-bold">Training Readiness</h3>
                  <p className={`text-lg font-semibold ${readiness.color}`}>{readiness.level}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Hooper Index</p>
                  <p className="text-xl font-bold">{hooperIndex}/20</p>
                </div>
              </div>
            </div>

            {/* Training Recommendations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Training Recommendations</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700">Training Intensity</p>
                  <p className="text-gray-600">{recommendations.intensity}</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700">Training Volume</p>
                  <p className="text-gray-600">{recommendations.volume}</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700">Recommended Focus</p>
                  <p className="text-gray-600">{recommendations.focus}</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700">Recovery Priority</p>
                  <p className="text-gray-600">{recommendations.recovery}</p>
                </div>
              </div>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Recent History</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {history.slice(0, 7).map((entry, index) => (
                    <div key={entry.date} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{new Date(entry.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">Hooper: {entry.hooperIndex}/20</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          entry.readiness === 'High' ? 'bg-green-100 text-green-800' :
                          entry.readiness === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {entry.readiness}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;