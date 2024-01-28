import React from 'react';

export default function SpellCard({ spell }) {
return (
<li className="spell-card card p-3">
    {/* Display spell name and level */}
    <h4 className="text-danger">{spell.name}</h4>
    <small>
    {spell.level > 0 && `Level ${spell.level} `}
    {spell.school.name}
    {spell.level === 0 && ' cantrip'}
    </small>

    {/* Display spell statistics */}
    <div className="stats mt-3">
    <p>
        <strong>Casting Time</strong>
        {spell.casting_time}
    </p>
    <p>
        <strong>Range</strong>
        {spell.range}
    </p>
    <p>
        <strong>Components</strong>
        {spell.components.join(', ')}
    </p>
    <p>
        <strong>Duration</strong>
        {spell.duration}
    </p>
    </div>
</li>
);
}
