//https://stackoverflow.com/questions/29919596/how-do-i-get-a-list-of-countries-in-my-website

import React from 'react';

const CountryPicker = ({ lang = 'en', value, onChange }) => {
    const A = 65;
    const Z = 90;
    const countryName = new Intl.DisplayNames([lang], { type: 'region' });
    const countries = [];

    for (let i = A; i <= Z; ++i) {
        for (let j = A; j <= Z; ++j) {
            let code = String.fromCharCode(i) + String.fromCharCode(j);
            let name = countryName.of(code);
            if (code !== name) {
                countries.push({ code, name });
            }
        }
    }

    return (
        <div>
            <label className="create-profile-label">
                Where are you from?
                <input
                    list="countries"
                    className="rounded-input"
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <datalist id="countries">
                    {countries.map((country) => (
                        <option key={country.code} value={country.name} />
                    ))}
                </datalist>
            </label>
        </div>
    );
};

export default CountryPicker;