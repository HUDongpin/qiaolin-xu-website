from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Qiaolin-XU-Shirleen-CV.pdf"

FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

INK = colors.HexColor("#172023")
MUTED = colors.HexColor("#596468")
ACCENT = colors.HexColor("#1B526E")
LINE = colors.HexColor("#D5DBDE")


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("PortfolioSans", FONT_REGULAR))
    pdfmetrics.registerFont(TTFont("PortfolioSans-Bold", FONT_BOLD))


def paragraph(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def section_heading(text: str, style: ParagraphStyle):
    return [Spacer(1, 8), paragraph(text, style), Spacer(1, 4)]


def role(title: str, organization: str, period: str, bullets: list[str], styles: dict[str, ParagraphStyle]):
    items = [
        paragraph(f"<b>{title}</b> | {organization}", styles["entry_title"]),
        paragraph(period, styles["meta"]),
        Spacer(1, 2),
    ]
    items.extend(paragraph(f"- {item}", styles["bullet"]) for item in bullets)
    items.append(Spacer(1, 7))
    return items


def set_document_metadata(canvas, _document) -> None:
    canvas.setTitle("Qiaolin XU (Shirleen) - Curriculum Vitae")
    canvas.setAuthor("Qiaolin XU (Shirleen)")
    canvas.setSubject("Public professional curriculum vitae for education opportunities")
    canvas.setCreator("Qiaolin XU (Shirleen) Educator Portfolio")


def build_pdf() -> None:
    register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    base = getSampleStyleSheet()
    styles = {
        "name": ParagraphStyle(
            "Name",
            parent=base["Normal"],
            fontName="PortfolioSans-Bold",
            fontSize=21,
            leading=23,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["Normal"],
            fontName="PortfolioSans-Bold",
            fontSize=11,
            leading=13.5,
            textColor=ACCENT,
            alignment=TA_CENTER,
            spaceAfter=3,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="PortfolioSans",
            fontSize=9.1,
            leading=11.5,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName="PortfolioSans-Bold",
            fontSize=9.8,
            leading=12,
            textColor=ACCENT,
            spaceBefore=1,
            spaceAfter=1,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="PortfolioSans",
            fontSize=9.2,
            leading=12,
            textColor=INK,
            alignment=TA_LEFT,
        ),
        "entry_title": ParagraphStyle(
            "EntryTitle",
            parent=base["Normal"],
            fontName="PortfolioSans",
            fontSize=9.7,
            leading=12.2,
            textColor=INK,
            spaceAfter=1,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=base["Normal"],
            fontName="PortfolioSans",
            fontSize=8.5,
            leading=10.5,
            textColor=MUTED,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="PortfolioSans",
            fontSize=8.95,
            leading=11.35,
            leftIndent=9,
            firstLineIndent=-9,
            textColor=INK,
            spaceAfter=1.5,
        ),
        "note": ParagraphStyle(
            "Note",
            parent=base["Normal"],
            fontName="PortfolioSans",
            fontSize=8.4,
            leading=10.7,
            textColor=MUTED,
        ),
    }

    document = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        rightMargin=0.62 * inch,
        leftMargin=0.62 * inch,
        topMargin=0.48 * inch,
        bottomMargin=0.45 * inch,
        title="Qiaolin XU (Shirleen) - Curriculum Vitae",
        author="Qiaolin XU (Shirleen)",
        subject="Public professional curriculum vitae for education opportunities",
    )

    story = [
        paragraph("Qiaolin XU (Shirleen)", styles["name"]),
        paragraph("Early Childhood Educator", styles["role"]),
        paragraph(
            "shirleenxql@gmail.com&nbsp;&nbsp;|&nbsp;&nbsp;www.xuqiaolin.com",
            styles["contact"],
        ),
        Spacer(1, 7),
        HRFlowable(width="100%", thickness=1, color=ACCENT, spaceAfter=5),
    ]

    story.extend(section_heading("PROFESSIONAL PROFILE", styles["section"]))
    story.extend(
        [
            paragraph(
                "Early childhood educator with documented K3 classroom experience, a Master of Education in Early Childhood Education, native Mandarin proficiency, and a planned U.S. Master of Arts in Teaching and teaching licensure pathway.",
                styles["body"],
            ),
            Spacer(1, 3),
        ]
    )

    story.extend(section_heading("PROFESSIONAL EXPERIENCE", styles["section"]))
    story.extend(
        role(
            "Kindergarten Teacher",
            "Qicai Kindergarten",
            "Sep 2021 - Jun 2023",
            [
                "Taught language development and social studies to children in a K3 kindergarten class.",
                "Assisted the lead teacher with classroom management, student supervision, and the implementation of classroom activities.",
            ],
            styles,
        )
    )
    story.extend(
        role(
            "Academic Affairs Officer / Part-time Lecturer",
            "Chongqing Institute of Foreign Studies",
            "Jun 2015 - Jan 2018",
            [
                "Coordinated undergraduate academic operations, including course scheduling, classroom allocation, examination administration, and academic timetable management.",
            ],
            styles,
        )
    )

    story.extend(section_heading("EDUCATION", styles["section"]))
    story.extend(
        [
            paragraph(
                "<b>Master of Education in Early Childhood Education</b> | The Education University of Hong Kong",
                styles["entry_title"],
            ),
            paragraph("Aug 2014 - May 2015", styles["meta"]),
            Spacer(1, 4),
            paragraph(
                "<b>Bachelor of Management in Public Affairs Management</b> | Changzhou University",
                styles["entry_title"],
            ),
            paragraph("Sep 2010 - Jun 2014", styles["meta"]),
            Spacer(1, 4),
        ]
    )

    story.extend(section_heading("LANGUAGES AND ASSESSMENTS", styles["section"]))
    story.extend(
        [
            paragraph(
                "<b>Mandarin:</b> Native speaker | Putonghua Shuiping Ceshi, Grade 2 Level A",
                styles["body"],
            ),
            paragraph("<b>English:</b> Duolingo English Test, overall score 120", styles["body"]),
            Spacer(1, 2),
            paragraph("- Chinese (Mandarin): World Language, Praxis 5665, reported score 196", styles["bullet"]),
            paragraph("- Elementary Education: Mathematics CKT, Praxis 7813, reported score 175", styles["bullet"]),
            paragraph("- Special Education: Foundational Knowledge, Praxis 5355, reported score 166", styles["bullet"]),
            paragraph(
                "These values are reported assessment scores. Teaching licensure remains part of the planned U.S. professional pathway.",
                styles["note"],
            ),
            Spacer(1, 3),
        ]
    )

    story.extend(section_heading("VOLUNTEER SERVICE", styles["section"]))
    story.extend(
        [
            paragraph("<b>Parent Volunteer</b> | Tai Po Baptist Kindergarten", styles["entry_title"]),
            paragraph("Sep 2023 - May 2024", styles["meta"]),
            Spacer(1, 3),
            paragraph(
                "<b>Volunteer</b> | 38th Hong Kong Special Olympics Indoor Rowing Competition",
                styles["entry_title"],
            ),
            paragraph("Oct 2014", styles["meta"]),
            Spacer(1, 4),
        ]
    )

    story.extend(section_heading("PLANNED PROFESSIONAL PATHWAY", styles["section"]))
    story.append(
        paragraph(
            "U.S. Master of Arts in Teaching study and teaching licensure. Program, enrollment, and licensure details will be updated when formally confirmed.",
            styles["body"],
        )
    )

    document.build(story, onFirstPage=set_document_metadata, onLaterPages=set_document_metadata)
    print(OUTPUT)


if __name__ == "__main__":
    build_pdf()
