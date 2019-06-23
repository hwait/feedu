import { saveAs, readFileSync } from 'file-saver';
import { Document, Packer, Paragraph, Styles, ParagraphProperties } from 'docx';
import moment from 'moment';
import 'moment/locale/ru';

const SchedulesDocx = (schedules, ds) => {
	var doc = new Document(undefined, {
		top: 720,
		right: 720,
		bottom: 720,
		left: 1440
	});
	doc.Styles.createParagraphStyle('Normal', 'Normal').basedOn('Normal').next('Normal').quickFormat().font('Calibri');

	doc.Styles
		.createParagraphStyle('Title', 'Title')
		.basedOn('Normal')
		.next('Normal')
		.quickFormat()
		.font('Calibri')
		.color('999999')
		.bold()
		.size(50)
		.spacing({ before: 240 });
	doc.Styles
		.createParagraphStyle('Heading1', 'Heading 1')
		.basedOn('Normal')
		.next('Normal')
		.quickFormat()
		.font('Bruskovaya')
		.spacing({ before: 0, after: 60 })
		.indent(720)
		.size(32);
	doc.Styles
		.createParagraphStyle('Heading2', 'Heading 2')
		.basedOn('Normal')
		.next('Normal')
		.quickFormat()
		.color('666666')
		.font('a_Assuan')
		.right()
		.underline('single', '000000')
		.size(22)
		.spacing({ before: 120, after: 0 });
	let date = moment(ds);
	for (let i = 0; i < 7; i++) {
		const items = schedules.filter((x) => x.ts.includes(date.format('YYYY-MM-DD')));
		if (items.length > 0) {
			doc.createParagraph(date.format('DD MMMM, dddd')).title();
			let n = 0;
			let lc = '';
			items.forEach((schedule) => {
				const { lesson, ts, dur } = schedule;
				const from = moment(ts);
				const { name, nmb, papers, tasks, videos, course } = lesson;
				if (lc !== course.name) doc.createParagraph(`${course.name}`).heading2();
				lc = course.name;
				doc
					.createParagraph(
						`${n + 1}. ${from.format('HH:mm')}-${from.add(dur, 'm').format('HH:mm')} №${nmb} ${name}`
					)
					.heading1();
				if (papers.length > 0)
					papers.forEach((paper) => {
						doc
							.createParagraph(
								`§ ${paper.paragraph} ${paper.book.author}// ${paper.book.name}, ${paper.book.year}`
							)
							.bullet();
					});
				if (videos.length > 0)
					videos.forEach((video) => {
						doc.createParagraph(`► [${video.dur} мин.] ${video.bink}`).bullet();
					});
				if (tasks.length > 0)
					tasks.forEach((task) => {
						doc
							.createParagraph(`℗ ${task.nmb} ${task.book.author}// ${task.book.name}, ${task.book.year}`)
							.bullet();
					});
				n++;
			});
		}
		date.add(1, 'day');
	}
	var packer = new Packer();
	packer.toBlob(doc).then((blob) => {
		saveAs(blob, 'example.docx');
	});
};

export default SchedulesDocx;
