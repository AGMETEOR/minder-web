import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
    href: string;
    text: string;
}

export default function ExternalLink(props: Props) {
    return (
        <Link href={props.href} target='_blank' className="hover:underline me-4 md:me-6 font-fig">
            {props.text}
            <FontAwesomeIcon className="text-xs ml-1" icon={faArrowUpRightFromSquare} />
        </Link>
    )
}