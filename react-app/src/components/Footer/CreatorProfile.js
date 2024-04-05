export const CreatorProfile = ({creator, creators}) => {
    return  (
        <a href={creator.github} id='creator-item' key={creators.indexOf(creator)} target="_blank">
            <p id='creator-name'>{creator.name}</p>
            <i id="github-icon" className="fab fa-github" ></i>
        </a>

    )
}
